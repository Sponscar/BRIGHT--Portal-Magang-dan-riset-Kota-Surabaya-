import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { EntityManager } from '@mikro-orm/postgresql';
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly em;
    constructor(configService: ConfigService, em: EntityManager);
    validate(payload: JwtPayload): Promise<{
        id: string;
        email: string;
        role: import("../../entities").UserRole;
        name: string;
    }>;
}
export {};
