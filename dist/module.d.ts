import { Compiler } from 'webpack';

interface PluginOptions {
    outputDir: string;
    key: string;
    cert: string;
    hosts?: string[];
    force?: boolean;
    autoUpgrade?: boolean;
}

declare class MkcertWebpackPlugin {
    private readonly options;
    constructor(options?: PluginOptions);
    private ensureCertificates;
    apply(compiler: Compiler): void;
}

export { MkcertWebpackPlugin as default };
