import * as crypto from 'crypto'


export function md5Hash(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex');
}