export type ScanResult = {
  status: 'passed' | 'failed' | 'unknown';
  usage: number;
};
