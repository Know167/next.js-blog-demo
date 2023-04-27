import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "@/components/container";
import HeroPost from "@/components/hero-post";
import Intro from "@/components/intro";
import Layout from "@/components/layout";
import MoreStories from "@/components/more-stories";
import { request } from "@/lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "@/lib/fragments";

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
    allHomepages {
      columns
      margin
      padding
      bgcolor {
        hex
      }
    }
    `,
    preview,
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
            environment: process.env.NEXT_DATOCMS_ENVIRONMENT || 'main',
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
}

export default function Index({ subscription }) {
  const {
    data: { allHomepages },
  } = useQuerySubscription(subscription);

  return (
    <>
      <Layout preview={subscription.preview}>
        <Head>{renderMetaTags(metaTags)}</Head>
        <Container>
          <Intro />
          {allHomepages.map((i, index) => {
            const columns = allHomepages[index].columns;
            const padding = allHomepages[index].padding;
            const margin = allHomepages[index].margin;
            const bgcolor = allHomepages[index].bgcolor.hex;
            return <HeroPost cols={columns} pad={padding} mar={margin} bgcolor={bgcolor}  />;
          })}
        </Container>
      </Layout>
    </>
  );
}
