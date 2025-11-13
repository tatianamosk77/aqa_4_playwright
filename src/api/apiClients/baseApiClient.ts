import { IRequestOptions, IResponse } from "data/types/core.types.js";
import { IApiClient } from "./types.js";

export abstract class BaseApiClient implements IApiClient {
  abstract send<T extends object | null>(options: IRequestOptions): Promise<IResponse<T>>;

  protected abstract transformResponse(): Promise<IResponse<object | null>>;
}
