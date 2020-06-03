import { GraphQLField, GraphQLObjectType, GraphQLEnumType, GraphQLInputField, GraphQLInputObjectType, GraphQLEnumValue, GraphQLInterfaceType, GraphQLScalarType, GraphQLArgument, GraphQLUnionType, getNamedType } from 'graphql'

export type TypeDefinition =
  | GraphQLField<any, any>
  | GraphQLScalarType
  | GraphQLArgument
  | GraphQLUnionType
  | GraphQLEnumType
  | GraphQLEnumValue
  | GraphQLObjectType
  | GraphQLInputField
  | GraphQLInputObjectType
  | GraphQLInterfaceType;

export type TypeOrDescription = TypeDefinition | string;
