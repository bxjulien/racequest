import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SupabaseService {
  private readonly supabaseUrl: string;
  private readonly supabaseApiKey: string;

  private supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    this.supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    this.supabaseApiKey = this.configService.get<string>('SUPABASE_API_KEY');

    if (!this.supabaseUrl || !this.supabaseApiKey) {
      throw new Error('Missing Supabase URL or API key');
    }

    this.supabase = createClient(this.supabaseUrl, this.supabaseApiKey);
  }

  async validateUser(token: string) {
    try {
      const { data: user, error } = await this.supabase.auth.getUser(token);

      if (error || !user) {
        throw new UnauthorizedException('Invalid token');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
