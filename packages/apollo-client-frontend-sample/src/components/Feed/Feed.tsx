import { useQuery } from '@apollo/client';
import { gql } from '../../__generated__/gql'

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
            {JSON.stringify(data)}
        </div>
    );
}