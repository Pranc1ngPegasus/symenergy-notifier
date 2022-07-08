import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get serverPort(): string {
    return this.configService.get('PORT') ?? '3000';
  }

  get loginId(): string {
    return this.configService.get('SYMENERGY_LOGIN_ID') ?? '';
  }

  get loginPassword(): string {
    return this.configService.get('SYMENERGY_LOGIN_PASSWORD') ?? '';
  }

  get contractId(): string {
    return this.configService.get('SYMENERGY_CONTRACT_ID') ?? '';
  }
}
