export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      follow: {
        Row: {
          created_at: string;
          from_user_id: string;
          id: number;
        };
        Insert: {
          created_at?: string;
          from_user_id: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          from_user_id?: string;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'follow_from_user_id_fkey';
            columns: ['from_user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      hash_tag: {
        Row: {
          created_at: string;
          hash_1: string | null;
          hash_2: string | null;
          hash_3: string | null;
          hash_4: string | null;
          hash_5: string | null;
          id: number;
          post_id: number;
        };
        Insert: {
          created_at?: string;
          hash_1?: string | null;
          hash_2?: string | null;
          hash_3?: string | null;
          hash_4?: string | null;
          hash_5?: string | null;
          id?: number;
          post_id: number;
        };
        Update: {
          created_at?: string;
          hash_1?: string | null;
          hash_2?: string | null;
          hash_3?: string | null;
          hash_4?: string | null;
          hash_5?: string | null;
          id?: number;
          post_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'hash_tag_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'product';
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
            referencedRelation: 'product';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      product: {
        Row: {
          content: string | null;
          created_at: string;
          id: number;
          price: number | null;
          product_img: string | null;
          title: string | null;
          user_id: string;
        };
        Insert: {
          content?: string | null;
          created_at: string;
          id: number;
          price?: number | null;
          product_img?: string | null;
          title?: string | null;
          user_id: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          price?: number | null;
          product_img?: string | null;
          title?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'product_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      product_category: {
        Row: {
          books: string | null;
          clothes: string | null;
          created_at: string;
          electronic: string | null;
          gift_card: string | null;
          id: number;
          pet_item: string | null;
          post_id: number;
        };
        Insert: {
          books?: string | null;
          clothes?: string | null;
          created_at?: string;
          electronic?: string | null;
          gift_card?: string | null;
          id?: number;
          pet_item?: string | null;
          post_id: number;
        };
        Update: {
          books?: string | null;
          clothes?: string | null;
          created_at?: string;
          electronic?: string | null;
          gift_card?: string | null;
          id?: number;
          pet_item?: string | null;
          post_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'product_category_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['id'];
          },
        ];
      };
      review: {
        Row: {
          created_at: string;
          good_product: number | null;
          good_time: number | null;
          kind: number | null;
          res_fast: number | null;
          same_product: number | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          good_product?: number | null;
          good_time?: number | null;
          kind?: number | null;
          res_fast?: number | null;
          same_product?: number | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          good_product?: number | null;
          good_time?: number | null;
          kind?: number | null;
          res_fast?: number | null;
          same_product?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'review_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          nickname: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          nickname?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          nickname?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
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
