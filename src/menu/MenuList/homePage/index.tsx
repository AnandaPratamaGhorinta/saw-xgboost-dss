import { createUseStyles } from "react-jss";
import { homePageStyles } from "./homePage.style";
import ViewTable from "./ViewTable";

const styles = createUseStyles(homePageStyles);

export default function HomePage() {
  const classes = styles();

  return (
    <div className={classes.home}>
      <ViewTable />
    </div>
  );
}
