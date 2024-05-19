import { useEffect } from "react";

const TweetEmbed = ({ url }) => {
  useEffect(() => {
    // Cargar el script de Twitter para los widgets
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://platform.twitter.com/widgets.js";
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, []);

  return (
    <blockquote
      className="twitter-tweet rounded-lg bg-white p-4 shadow-md"
      data-theme="dark"
    >
      <p lang="en" dir="ltr">
        Google Maps just got upgraded!
        <br />
        <br />
        Here are 5 new awesome features available on Maps:{" "}
        <a href="https://t.co/yVQNnGucwu">pic.twitter.com/yVQNnGucwu</a>
      </p>
      &mdash; Roni Rahman (@heyronir){" "}
      <a href="https://twitter.com/heyronir/status/1792095625963819246?ref_src=twsrc%5Etfw">
        May 19, 2024
      </a>
    </blockquote>
  );
};
const TweetEmbed2 = ({ url }) => {
  useEffect(() => {
    // Cargar el script de Twitter para los widgets
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://platform.twitter.com/widgets.js";
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, []);

  return (
    <blockquote
      className="twitter-tweet rounded-lg bg-white p-4 shadow-md"
      data-theme="dark"
    >
      <p lang="en" dir="ltr">
        OA MacApp
        <br />
        <br />
        pure gold
        <a href="https://t.co/z5LglNUn6g">pic.twitter.com/z5LglNUn6g</a>
      </p>
      &mdash; Linus ●ᴗ● Ekenstam (@LinusEkenstam){" "}
      <a href="https://twitter.com/LinusEkenstam/status/1790155407203426695?ref_src=twsrc%5Etfw">
        May 13, 2024
      </a>
    </blockquote>
  );
};
export { TweetEmbed, TweetEmbed2 };
{
  /* <blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">OA MacApp <br><br>pure gold <br><br> <a href="https://t.co/z5LglNUn6g">pic.twitter.com/z5LglNUn6g</a></p>&mdash; Linus ●ᴗ● Ekenstam (@LinusEkenstam) <a href="https://twitter.com/LinusEkenstam/status/1790155407203426695?ref_src=twsrc%5Etfw">May 13, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */
}
