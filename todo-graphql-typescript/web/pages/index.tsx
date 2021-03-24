import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import Layout from "../components/Layout";

const TEST_QUERY = gql`
  query allItems {
    allItems {
      id
      name
      price
    }
  }
`;
const IndexPage = () => {
  const { loading, error, data } = useQuery(TEST_QUERY);
  if (loading) return <p>Loading...</p>;
  console.log(data);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
