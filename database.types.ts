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
          category1_id: number | null;
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          category1_id?: number | null;
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          category1_id?: number | null;
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'categories2_category1_id_fkey';
            columns: ['category1_id'];
            isOneToOne: false;
            referencedRelation: 'categories1';
            referencedColumns: ['id'];
          },
        ];
      };
      chat_messages: {
        Row: {
          author_id: string | null;
          chat_id: number | null;
          content: string | null;
          created_at: string;
          id: string;
          img_src: string | null;
          request_answer: boolean | null;
          type: string;
          visible: boolean;
        };
        Insert: {
          author_id?: string | null;
          chat_id?: number | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          img_src?: string | null;
          request_answer?: boolean | null;
          type?: string;
          visible?: boolean;
        };
        Update: {
          author_id?: string | null;
          chat_id?: number | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          img_src?: string | null;
          request_answer?: boolean | null;
          type?: string;
          visible?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_messages_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_messages_chat_id_fkey';
            columns: ['chat_id'];
            isOneToOne: false;
            referencedRelation: 'chats';
            referencedColumns: ['id'];
          },
        ];
      };
      chat_user: {
        Row: {
          chat_id: number | null;
          created_at: string;
          id: number;
          user1_id: string;
          user2_id: string;
        };
        Insert: {
          chat_id?: number | null;
          // created_at?: string;
          // id?: number;
          user1_id: string;
          user2_id: string;
        };
        Update: {
          chat_id?: number | null;
          created_at?: string;
          id?: number;
          user1_id?: string;
          user2_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_user_chat_id_fkey';
            columns: ['chat_id'];
            isOneToOne: true;
            referencedRelation: 'chats';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_user_user1_id_fkey';
            columns: ['user1_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_user_user2_id_fkey';
            columns: ['user2_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      chats: {
        Row: {
          created_at: string;
          id: number;
          product_id: number;
        };
        Insert: {
          // created_at?: string;
          // id?: number;
          product_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          product_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'chats_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
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
          to_user_nickname: string;
          follow_id: string;
          to_user_img: string;
        };
        Insert: {
          created_at?: string;
          from_user_id: string;
          id?: number;
          to_user_id: string;
          to_user_nickname: string;
          follow_id: string;
          to_user_img: string;
        };
        Update: {
          created_at?: string;
          from_user_id?: string;
          id?: number;
          to_user_id?: string;
          to_user_nickname?: string;
          follow_id: string;
          to_user_img: string;
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
          products: Tables<'products'>[];
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
          category2_id: number;
          content: string | null;
          created_at: string;
          id: number;
          price: string;
          product_img: string[] | null;
          title: string | null;
          user_id: string;
          status: boolean;
        };
        Insert: {
          category2_id?: number;
          content?: string | null;
          created_at?: string;
          id?: number;
          price: string;
          product_img?: string[] | null;
          title?: string | null;
          user_id: string;
          status: boolean;
        };
        Update: {
          category2_id?: number;
          content?: string | null;
          created_at?: string;
          id?: number;
          price?: string;
          product_img?: string[] | null;
          title?: string | null;
          user_id?: string;
          status?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'products_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
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
      sales: {
        Row: {
          created_at: string;
          id: number;
          product_id: number | null;
          user_id: string | null;
          review_status: boolean;
          products: Tables<'products'>[];
        };
        Insert: {
          created_at?: string;
          id?: number;
          product_id?: number | null;
          user_id?: string | null;
          review_status: boolean;
        };
        Update: {
          created_at?: string;
          id?: number;
          product_id?: number | null;
          user_id?: string | null;
          review_status: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'sales_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'sales_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          avatar_img: string | null;
          created_at: string;
          email: string;
          id: string;
          nickname: string | null;
          point: number | null;
        };
        Insert: {
          avatar_img?: string | null;
          created_at?: string;
          email: string;
          id: string;
          nickname?: string | null;
          point?: number | null;
        };
        Update: {
          avatar_img?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          nickname?: string | null;
          point?: number | null;
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
      get_category_products: {
        Args: {
          input_category_name: string;
        };
        Returns: {
          product_id: number;
          title: string;
          content: string;
          created_at: string;
          price: string;
          product_img: string[];
          user_id: string;
          status: boolean;
          category1_id: number;
          like_count: number;
          hash_tags: string[];
          category1_name: string;
          category2_name: string;
        }[];
      };
      get_channel_messages: {
        Args: {
          input_channel_id: number;
        };
        Returns: {
          message_id: string;
          message_created_at: string;
          current_chat_id: number;
          content: string;
          author_id: string;
          visible: boolean;
          type: string;
          img_src: string;
          request_answer: boolean;
        }[];
      };
      get_latest_products: {
        Args: Record<PropertyKey, never>;
        Returns: {
          product_id: number;
          title: string;
          content: string;
          created_at: string;
          price: string;
          product_img: string[];
          user_id: string;
          status: boolean;
          category1_id: number;
          like_count: number;
          hash_tags: string[];
          category1_name: string;
          category2_name: string;
        }[];
      };
      get_likes_products: {
        Args: {
          input_user_id: string;
        };
        Returns: {
          product_id: number;
          title: string;
          content: string;
          created_at: string;
          price: string;
          product_img: string[];
          user_id: string;
          status: boolean;
          category1_id: number;
          like_count: number;
          hash_tags: string[];
          category1_name: string;
          category2_name: string;
        }[];
      };
      get_popular_products: {
        Args: Record<PropertyKey, never>;
        Returns: {
          product_id: number;
          title: string;
          content: string;
          created_at: string;
          price: string;
          product_img: string[];
          user_id: string;
          status: boolean;
          category1_id: number;
          like_count: number;
          hash_tags: string[];
          category1_name: string;
          category2_name: string;
        }[];
      };
      get_sales_products: {
        Args: {
          input_user_id: string;
        };
        Returns: {
          product_id: number;
          title: string;
          content: string;
          created_at: string;
          price: string;
          product_img: string[];
          user_id: string;
          status: boolean;
          category1_id: number;
          like_count: number;
          hash_tags: string[];
          category1_name: string;
          category2_name: string;
        }[];
      };
      get_user_channel: {
        Args: {
          input_user_id: string;
        };
        Returns: {
          chat_id: number;
          chat_created_at: string;
          user1_id: string;
          user2_id: string;
          top_message: Json[];
          invisible_count: number;
          product_status: boolean;
          product_id: number;
        }[];
      };
      update_visible: {
        Args: {
          input_user_id: string;
          input_chat_id: number;
        };
        Returns: undefined;
      };
      get_product: {
        Args: {
          input_post_id: number;
        };
        Returns: {
          product_id: number;
          title: string;
          content: string;
          created_at: string;
          price: string;
          product_img: string[];
          user_id: string;
          status: boolean;
          category1_id: number;
          like_count: number;
          hash_tags: string[];
          category1_name: string;
          category2_name: string;
        }[];
      };
      get_purchase_lists: {
        Args: {
          input_user_id: string;
        };
        Returns: {
          product_id: number;
          title: string;
          content: string;
          created_at: string;
          price: string;
          product_img: string[];
          user_id: string;
          status: boolean;
          category1_id: number;
          like_count: number;
          hash_tags: string[];
          category1_name: string;
          category2_name: string;
          review_status: boolean;
          purchased_user_id: string;
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
