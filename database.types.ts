export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      categories1: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      categories2: {
        Row: {
          category1Id: number | null;
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          category1Id?: number | null;
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          category1Id?: number | null;
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'categories2_category1Id_fkey';
            columns: ['category1Id'];
            isOneToOne: false;
            referencedRelation: 'categories1';
            referencedColumns: ['id'];
          },
        ];
      };
      follow: {
        Row: {
          created_at: string;
          from_user_id: string;
          id: number;
          to_user_id: string;
        };
        Insert: {
          created_at?: string;
          from_user_id: string;
          id?: number;
          to_user_id: string;
        };
        Update: {
          created_at?: string;
          from_user_id?: string;
          id?: number;
          to_user_id?: string;
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
          hash_tag: string[] | null;
          id: number;
          post_id: number;
        };
        Insert: {
          created_at?: string;
          hash_tag?: string[] | null;
          id?: number;
          post_id: number;
        };
        Update: {
          created_at?: string;
          hash_tag?: string[] | null;
          id?: number;
          post_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'hash_tag_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'products';
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
            referencedRelation: 'products';
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
      products: {
        Row: {
          content: string | null;
          createdAt: string;
          id: number;
          price: string;
          productImg: string[] | null;
          title: string | null;
          userId: string;
        };
        Insert: {
          content?: string | null;
          createdAt?: string;
          id?: number;
          price: string;
          productImg?: string[] | null;
          title?: string | null;
          userId: string;
        };
        Update: {
          content?: string | null;
          createdAt?: string;
          id?: number;
          price?: string;
          productImg?: string[] | null;
          title?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'products_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      productsToCategories2: {
        Row: {
          category2Id: number | null;
          created_at: string;
          id: number;
          productId: number | null;
        };
        Insert: {
          category2Id?: number | null;
          created_at?: string;
          id?: number;
          productId?: number | null;
        };
        Update: {
          category2Id?: number | null;
          created_at?: string;
          id?: number;
          productId?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'productsToCategories2_category2Id_fkey';
            columns: ['category2Id'];
            isOneToOne: false;
            referencedRelation: 'categories2';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productsToCategories2_productId_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
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
      get_latest_products: {
        Args: Record<PropertyKey, never>;
        Returns: {
          product_id: number;
          title: string;
          content: string;
          createdat: string;
          price: string;
          productimg: string[];
          userid: string;
          like_count: number;
        }[];
      };
      get_popular_products: {
        Args: Record<PropertyKey, never>;
        Returns: {
          product_id: number;
          title: string;
          content: string;
          createdat: string;
          price: string;
          productimg: string[];
          userid: string;
          like_count: number;
        }[];
      };
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
