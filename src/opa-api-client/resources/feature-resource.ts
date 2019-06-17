import axios from "axios";
import {BaseResource} from "./base-resource";
import {IRawOpaResource} from "./types";

export interface IFeature {
  description: string;
}

export type IFeatureList = Record<string, IFeature>;

export class FeatureResource extends BaseResource {
  public async list(): Promise<IFeatureList> {
    const requestUrl = this.buildRequestUrl("data/features");
    const {data} = await axios.get<IRawOpaResource<IFeatureList>>(requestUrl);
    return data.result || {};
  }
}
