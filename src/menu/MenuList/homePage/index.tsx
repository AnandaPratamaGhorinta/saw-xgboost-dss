import { createUseStyles } from "react-jss";
import { homePageStyles } from "./homePage.style";

const styles = createUseStyles(homePageStyles);

export default function HomePage() {
  const classes = styles();

  return (
    <div>
      <h1 className={classes.header}>Home Page</h1>
      <div className={classes.home}>content</div>
    </div>
  );
}
