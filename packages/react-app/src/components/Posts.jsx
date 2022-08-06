import React from "react";
import { gql, useQuery } from "@apollo/client";
import { PROFILE_ID } from "../views/NewPost";

export const PUBLICATION_QUERY = gql`
  query Publications($profileId: ProfileId) {
    publications(request: { profileId: $profileId, publicationTypes: [POST], limit: 3 }) {
      items {
        __typename
        ... on Post {
          ...PostFields
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }

  fragment MediaFields on Media {
    url
    mimeType
  }

  fragment ProfileFields on Profile {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    isFollowedByMe
    isFollowing(who: null)
    followNftAddress
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    ownedBy
    dispatcher {
      address
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
        type
      }
      ... on RevertFollowModuleSettings {
        type
      }
    }
  }

  fragment PublicationStatsFields on PublicationStats {
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
  }

  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }

  fragment Erc20Fields on Erc20 {
    name
    symbol
    decimals
    address
  }

  fragment CollectModuleFields on CollectModule {
    __typename
    ... on FreeCollectModuleSettings {
      type
      followerOnly
      contractAddress
    }
    ... on FeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
    ... on RevertCollectModuleSettings {
      type
    }
    ... on TimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
  }

  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
    hidden
    reaction(request: null)
    mirrors(by: null)
    hasCollectedByMe
  }
`;

const PostLoading = () => {
  return (
    <div
      style={{
        padding: 8,
        borderStyle: "solid",
        borderRadius: 5,
        borderColor: "grey",
        borderWidth: 1,
      }}
    >
      <h4>...</h4>
      <div>...</div>
    </div>
  );
};

export default function Posts(props) {
  const { data, loading, error } = useQuery(PUBLICATION_QUERY, {
    variables: { profileId: `0x${PROFILE_ID.toString(16)}` },
  });

  if (loading) {
    return (
      <div style={{ textAlign: "left" }}>
        <PostLoading />
        <PostLoading />
        <PostLoading />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ textAlign: "left" }}>
      {data.publications.items.map(p => (
        <a href={`https://lenster.xyz/posts/${p.id}`}>
          <div
            style={{
              padding: 8,
              borderStyle: "solid",
              borderRadius: 5,
              borderColor: "grey",
              borderWidth: 1,
            }}
          >
            <h4>{new Date(Date.parse(p.createdAt)).toLocaleString()}</h4>
            <div>{p.metadata.content}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
