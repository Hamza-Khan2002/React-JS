import { createFileRoute } from "@tanstack/react-router";

import { CustomCursor } from "@/components/site/cursor";
import { SiteFooter } from "@/components/site/footer";
import { EyeLoader } from "@/components/site/loader";
import { Vanish } from "@/components/site/motion";
import { SiteNav } from "@/components/site/nav";
import {
  FinalCta,
  Hero,
  Process,
  Services,
  Team,
  TrustBar,
} from "@/components/site/sections";
import { Testimonials } from "@/components/site/testimonials";
import { Work } from "@/components/site/work";

const TITLE = "4See — AI Agents, Automation & Product Studio";
const DESCRIPTION =
  "4See is a four-person studio building AI agents, automations, web and cloud products. See beyond. Build better.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <EyeLoader />
      <CustomCursor />
      <SiteNav />
      <main>
        <Vanish>
          <Hero />
        </Vanish>
        <Vanish>
          <TrustBar />
        </Vanish>
        <Vanish>
          <Team />
        </Vanish>
        <Vanish>
          <Services />
        </Vanish>
        <Vanish>
          <Work />
        </Vanish>
        <Vanish>
          <Process />
        </Vanish>
        <Vanish>
          <Testimonials />
        </Vanish>
        <Vanish>
          <FinalCta />
        </Vanish>
      </main>
      <SiteFooter />
    </div>
  );
}
