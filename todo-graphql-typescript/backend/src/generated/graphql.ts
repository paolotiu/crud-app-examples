import { GraphQLResolveInfo } from 'graphql';
import { ItemAndCategoryIDs } from '../types/modelTypes';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  items: Array<Maybe<Item>>;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Int'];
};

export type ItemAndCategory = {
  __typename?: 'ItemAndCategory';
  item?: Maybe<Item>;
  category?: Maybe<Category>;
};

export type OneItemAndCategories = {
  __typename?: 'OneItemAndCategories';
  item?: Maybe<Item>;
  categories?: Maybe<Array<Maybe<Category>>>;
};

export type Query = {
  __typename?: 'Query';
  allItems: Array<Maybe<Item>>;
  allCategories: Array<Maybe<Category>>;
  item?: Maybe<Item>;
  itemsByName: Array<Maybe<Item>>;
  category?: Maybe<Category>;
  categoryByName?: Maybe<Category>;
};


export type QueryItemArgs = {
  id: Scalars['ID'];
};


export type QueryItemsByNameArgs = {
  name: Scalars['String'];
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryCategoryByNameArgs = {
  name: Scalars['String'];
};

export type CreateItemInput = {
  name: Scalars['String'];
  price: Scalars['Int'];
  categoryId?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateItemInput = {
  id: Scalars['ID'];
  newName?: Maybe<Scalars['String']>;
  newPrice?: Maybe<Scalars['Int']>;
};

export type UpdateCatetgoryInput = {
  id: Scalars['ID'];
  newName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: Item;
  deleteItem: Item;
  createCategory: Category;
  deleteCategory: Category;
  addItemToCategory?: Maybe<OneItemAndCategories>;
  removeItemFromCategory: Scalars['Boolean'];
  updateItem: Item;
  updateCategory: Category;
};


export type MutationCreateItemArgs = {
  data: CreateItemInput;
};


export type MutationDeleteItemArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationAddItemToCategoryArgs = {
  itemId: Scalars['ID'];
  categoryId: Array<Scalars['ID']>;
};


export type MutationRemoveItemFromCategoryArgs = {
  itemId: Scalars['ID'];
  categoryId: Scalars['ID'];
};


export type MutationUpdateItemArgs = {
  data: UpdateItemInput;
};


export type MutationUpdateCategoryArgs = {
  data: UpdateCatetgoryInput;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Category: ResolverTypeWrapper<Category>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Item: ResolverTypeWrapper<Item>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ItemAndCategory: ResolverTypeWrapper<ItemAndCategoryIDs>;
  OneItemAndCategories: ResolverTypeWrapper<OneItemAndCategories>;
  Query: ResolverTypeWrapper<{}>;
  CreateItemInput: CreateItemInput;
  UpdateItemInput: UpdateItemInput;
  UpdateCatetgoryInput: UpdateCatetgoryInput;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Category: Category;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Item: Item;
  Int: Scalars['Int'];
  ItemAndCategory: ItemAndCategoryIDs;
  OneItemAndCategories: OneItemAndCategories;
  Query: {};
  CreateItemInput: CreateItemInput;
  UpdateItemInput: UpdateItemInput;
  UpdateCatetgoryInput: UpdateCatetgoryInput;
  Mutation: {};
  Boolean: Scalars['Boolean'];
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  items?: Resolver<Array<Maybe<ResolversTypes['Item']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemAndCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemAndCategory'] = ResolversParentTypes['ItemAndCategory']> = ResolversObject<{
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OneItemAndCategoriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['OneItemAndCategories'] = ResolversParentTypes['OneItemAndCategories']> = ResolversObject<{
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  allItems?: Resolver<Array<Maybe<ResolversTypes['Item']>>, ParentType, ContextType>;
  allCategories?: Resolver<Array<Maybe<ResolversTypes['Category']>>, ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryItemArgs, 'id'>>;
  itemsByName?: Resolver<Array<Maybe<ResolversTypes['Item']>>, ParentType, ContextType, RequireFields<QueryItemsByNameArgs, 'name'>>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id'>>;
  categoryByName?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryByNameArgs, 'name'>>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createItem?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<MutationCreateItemArgs, 'data'>>;
  deleteItem?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<MutationDeleteItemArgs, 'id'>>;
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'name'>>;
  deleteCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  addItemToCategory?: Resolver<Maybe<ResolversTypes['OneItemAndCategories']>, ParentType, ContextType, RequireFields<MutationAddItemToCategoryArgs, 'itemId' | 'categoryId'>>;
  removeItemFromCategory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveItemFromCategoryArgs, 'itemId' | 'categoryId'>>;
  updateItem?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'data'>>;
  updateCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'data'>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Category?: CategoryResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  ItemAndCategory?: ItemAndCategoryResolvers<ContextType>;
  OneItemAndCategories?: OneItemAndCategoriesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
