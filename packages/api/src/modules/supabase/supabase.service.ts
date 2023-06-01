import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

  getSupabase(): SupabaseClient {
    return this.supabase;
  }
}
