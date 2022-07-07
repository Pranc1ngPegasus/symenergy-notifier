import { Injectable } from '@nestjs/common';
import { SymenergyScanner, ScanResult } from './scanner/index';
import { ApiConfigService } from 'src/config/config.service';

@Injectable()
export class AppService {
  constructor(private readonly config: ApiConfigService) {}

  getHealthcheck(): string {
    return 'ok';
  }

  async scan(): Promise<ScanResult> {
    const auth = {
      id: this.config.loginId,
      password: this.config.loginPassword,
      contractId: this.config.contractId,
    };
    const scanner = new SymenergyScanner(auth);

    return await scanner.scan();
  }
}
