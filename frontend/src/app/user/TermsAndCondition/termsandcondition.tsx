import TitleBanner from "../../components/custom/TitleBanner";
import styles from "./styles.module.css";

const content = `<h4 class="1bh-base fw-normal "><h2 style="margin-right: 0px; margin-bottom: 10px; margin-left: 0px; line-height: 24px; padding: 0px; background-color: rgb(255, 255, 255);"><p style="color: rgb(0, 0, 0); font-size: 13px; font-weight: 400;">Users can choose a monthly investment amount between ₹100 and ₹15,00,000.</p><p style="color: rgb(0, 0, 0); font-size: 13px; font-weight: 400;">Investments in this scheme start from ₹100.</p><p style="color: rgb(0, 0, 0); font-size: 13px; font-weight: 400;">The plan will activate once the user’s cumulative investment reaches an amount equivalent to 1 gram of gold.</p><p style="color: rgb(0, 0, 0); font-size: 13px; font-weight: 400;">Users will earn a return in Greenheap Gold based on their investment tenure. For example, at 3 months, a return of ₹7.50 is given, calculated at 0.25% per month on an investment of ₹1000.</p><p style="color: rgb(0, 0, 0); font-size: 13px; font-weight: 400;">An additional bonus in the form of Silver is provided for each period. For example, after 3 months, the bonus is ₹24, calculated at 0.8% per month for an investment of ₹1000.</p><p style="color: rgb(0, 0, 0); font-size: 13px; font-weight: 400;">If the user cancels the plan after making 5 payments out of a 6-month plan, the plan will be adjusted to reflect a 3-month duration. The user will receive the corresponding returns for the 3-month period, minus a 6% service charge.</p></h2></h4>`;

const Terms = () => {
  return (
    <div className={styles.terms_condition_bg}>
      <TitleBanner
        title={<h1 className="text-black">Terms & Conditions</h1>}
        fontSize="5rem"
        bgColor="white"
        height="30vh"
        showContactUs={false}
      />
      <div className={`container py-2 text-black`}>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  );
};

export default Terms;

