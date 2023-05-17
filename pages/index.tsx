import { getBaseURL } from "../app/check-env";
import "../app/globals.scss";
import "../app/index.scss";
import { IndexProps } from "../app/index.props";

export async function getServerSideProps() {
  const base = getBaseURL();
  const respose = await fetch(`${base}/api/cv`);
  const html = (await respose.json()).html as IndexProps;

  return {
    props: {
      html,
    },
  };
}

export default function Index({ html }: IndexProps) {
  return (
    <main className="w-full mt-4 px-4 container flex flex-col items-center">
      <section className="w-full h-screen" id="personal-information">
        <div
          className="w-full text-center flex flex-col justify-center items-center"
          dangerouslySetInnerHTML={{ __html: html.profile }}
        ></div>
        <div
          className="w-full px-32-md text-center"
          dangerouslySetInnerHTML={{ __html: html.personal }}
        ></div>
      </section>
      <section
        className="py-8 px-32-md mb-32"
        id="experience"
        dangerouslySetInnerHTML={{ __html: html.experience }}
      ></section>
    </main>
  );
}
