export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          comment: string | null;
          comment_id: string | null;
          created_at: string;
          id: number;
          post_id: number | null;
          user_name: string | null;
        };
        Insert: {
          comment?: string | null;
          comment_id?: string | null;
          created_at: string;
          id?: number;
          post_id?: number | null;
          user_name?: string | null;
        };
        Update: {
          comment?: string | null;
          comment_id?: string | null;
          created_at?: string;
          id?: number;
          post_id?: number | null;
          user_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
        ];
      };
      follow: {
        Row: {
          created_at: string;
          from_user_id: string | null;
          id: number;
          to_user_id: string | null;
        };
        Insert: {
          created_at?: string;
          from_user_id?: string | null;
          id?: number;
          to_user_id?: string | null;
        };
        Update: {
          created_at?: string;
          from_user_id?: string | null;
          id?: number;
          to_user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'follow_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      likes: {
        Row: {
          created_at: string | null;
          id: number;
          post_id: number | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          post_id?: number | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          post_id?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
        ];
      };
      posts: {
        Row: {
          content: string | null;
          created_at: string;
          id: number;
          title: string | null;
          user_name: string | null;
        };
        Insert: {
          content?: string | null;
          created_at: string;
          id?: number;
          title?: string | null;
          user_name?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          title?: string | null;
          user_name?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          email: string | null;
          id: number;
          nickname: string | null;
          password: string | null;
          u_id: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: number;
          nickname?: string | null;
          password?: string | null;
          u_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: number;
          nickname?: string | null;
          password?: string | null;
          u_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_u_id_fkey';
            columns: ['u_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
    ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
