//This resource type describes a builder.
//http://docs.buildbot.net/latest/developer/rest.html#builder
export interface IBuilder {
    builderid: number;
    description?: any;
    masterids: number[];
    name: string;
    tags: string[];
  }