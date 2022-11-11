declare namespace pathAliases {

  export type TYPE_DEFAULT_OPTIONS = {
    appRootPath?: string,
    config?: string | object,
    propertyName?: string | boolean,
  };

  export function setConfig(options?: TYPE_DEFAULT_OPTIONS): void;

  export function resolve(propertyName?: string): object;

  export function toJSON(): object;

  export const config: object;

  export const options: TYPE_DEFAULT_OPTIONS;

}

export = pathAliases