import { useQuery } from '@apollo/client';
import { gql } from '../../__generated__'
import Link from "../Link";

const FEED_QUERY = gql(`
  query FeedQuery {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`);

export default function Feed() {
  const { loading, data, error } = useQuery(FEED_QUERY);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <div>
      {data?.feed.links.map((link) => (
        <Link
          key={link.id}
          createdAt={link.createdAt}
          description={link.description}
          url={link.url}
        />
      ))}
    </div>
  );
}