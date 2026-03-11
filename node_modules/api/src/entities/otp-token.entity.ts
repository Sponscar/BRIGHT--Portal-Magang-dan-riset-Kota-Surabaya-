import { Entity, PrimaryKey, Property, Enum } from '@mikro-orm/core';
import { v4 } from 'uuid';

export enum OtpType {
    REGISTER = 'register',
    RESET_PASSWORD = 'reset_password',
}

@Entity({ tableName: 'otp_tokens' })
export class OtpToken {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ length: 255 })
    email!: string;

    @Property({ length: 6 })
    code!: string;

    @Enum({ items: () => OtpType })
    type!: OtpType;

    @Property({ type: 'timestamptz' })
    expiresAt!: Date;

    @Property({ default: false })
    used: boolean = false;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();
}
