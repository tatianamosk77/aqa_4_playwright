/* Создайте ОДИН смоук тест со следующими шагами:

1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
2. Заполните форму регистрации
3. Проверьте, что пользователь успешно зарегистрирован
*/

import { test, expect } from "@playwright/test";

type gender = "male" | "female";

enum HOBBIES {
    TRAVELLING = "Travelling",
    MOVIES = "Movies",
    SPORTS = "Sports",
    GAMING = "Gaming",
    DANCING = "Dancing",
}
enum SKILLS {
    JAVASCRIPT = "JavaScript",
    PYTHON = "Python",
    JAVA = "Java",
    CPP = "C++",
    RUBY = "Ruby",
}
enum COUNTRY {
    USA = "USA",
    CANADA = "Canada",
    UK = "UK",
}
interface ICredentials {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phone: string;
    language: string;
    yearOfBirth: string;
    monthOfBirth: string;
    dayOfBirth: string;
    password: string;
    gender: gender;
    hobbies: HOBBIES[];
    skills: SKILLS[];
    country: COUNTRY[];
}

const validCredentials: ICredentials = {
    firstName: "Tatiana",
    lastName: "QA",
    address: "Lenina",
    email: "123@mail.ru",
    phone: "+7-666-666-66 66",
    language: "English",
    yearOfBirth: "1994",
    monthOfBirth: "September",
    dayOfBirth: "2",
    password: "Qwerty666",
    gender: "female",
    hobbies: [
        HOBBIES.TRAVELLING,
        HOBBIES.MOVIES,
        HOBBIES.SPORTS,
    ],
    skills: [SKILLS.JAVASCRIPT, SKILLS.JAVA],
    country: [COUNTRY.UK],
};

test.describe("[Full registration Form]", () => {
    test.beforeEach(async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
        await page.goto(url);
    });

    test("Success registration", async ({ page }) => {
        const genderValue = validCredentials.gender;
        const hobbiesValue = validCredentials.hobbies;
        const firstNameInput = page.locator("#firstName");
        const lastNameInput = page.locator("#lastName");
        const addressInput = page.locator("#address");
        const emailInput = page.locator("#email");
        const phoneInput = page.locator("#phone");
        const countryDropdown = page.locator("#country");
        const genderType = page.locator(`//input[@value="${genderValue}"]`
        );
        const languageInput = page.locator("#language");
        const skillsTypeDropdown = page.locator("#skills");

        const yearOfBirth = page.locator("#year");
        const monthOfBirth = page.locator("#month");
        const dayOfBirth = page.locator("#day");
        const passwordInput = page.locator("#password");
        const confirmPasswordInput = page.locator("#password-confirm");
        const submitButton = page.locator("//button[@type = 'submit']");
        const title = page.locator("//h2[@class='text-center']");

        const fullNameResult = page.locator('#fullName')
        const addressResult = page.locator('#address')
        const emailResult = page.locator('#email')
        const phoneResult = page.locator('#phone')
        const countryResult = page.locator('#country')
        const genderResult = page.locator('#gender')
        const languageResult = page.locator('#language')
        const skillsResult = page.locator('#skills')
        const hobbiesResult = page.locator('#hobbies')
        const dateOfBirthResult = page.locator('#dateOfBirth')
        const passwordResult = page.locator('#password')

        await firstNameInput.fill(validCredentials.firstName)
        await lastNameInput.fill(validCredentials.lastName)
        await addressInput.fill(validCredentials.address)
        await emailInput.fill(validCredentials.email)
        await phoneInput.fill(validCredentials.phone)
        await countryDropdown.selectOption(validCredentials.country)
        await genderType.check()
        await languageInput.fill(validCredentials.language)
        await skillsTypeDropdown.selectOption(validCredentials.skills);

        for (const hobby of validCredentials.hobbies) {
            await page.locator(`//input[@class='hobby'and @value="${hobby}"]`).check();
        }
        await yearOfBirth.selectOption(validCredentials.yearOfBirth)
        await monthOfBirth.selectOption(validCredentials.monthOfBirth)
        await dayOfBirth.selectOption(validCredentials.dayOfBirth)
        await passwordInput.fill(validCredentials.password)
        await confirmPasswordInput.fill(validCredentials.password)
        await submitButton.click()

        await expect(title).toHaveText('Registration Details')
        await expect(fullNameResult).toHaveText(`${validCredentials.firstName} ${validCredentials.lastName}`)
        await expect(addressResult).toHaveText(validCredentials.address)
        await expect(emailResult).toHaveText(validCredentials.email)
        await expect(phoneResult).toHaveText(validCredentials.phone)
        await expect(countryResult).toHaveText(validCredentials.country)
        await expect(genderResult).toHaveText(validCredentials.gender)
        await expect(languageResult).toHaveText(validCredentials.language)
        await expect(skillsResult).toHaveText(validCredentials.skills.join(', '))
        await expect(hobbiesResult).toHaveText(validCredentials.hobbies.join(', '))
        await expect(dateOfBirthResult).toHaveText(`${validCredentials.dayOfBirth} ${validCredentials.monthOfBirth} ${validCredentials.yearOfBirth}`)
        await expect(passwordResult).toHaveText('*'.repeat(validCredentials.password.length))
    });
})
