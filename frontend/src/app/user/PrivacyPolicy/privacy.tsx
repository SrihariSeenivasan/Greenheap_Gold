import TitleBanner from "../../components/custom/TitleBanner";
import styles from "./styles.module.css";

const PrivacyPlicyPage = () => {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      {/* Banner section with background image and centered title */}
      <div
        style={{
          width: "100%",
          height: "38vh",
          minHeight: 260,
          background: `url('/home/banner 2.png') center center/cover no-repeat`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginTop: 120, // 44px top bar + ~48px nav bar
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.32)",
            zIndex: 1,
          }}
        ></div>
        <h1
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "2.8rem",
            letterSpacing: 0.5,
            zIndex: 2,
            position: "relative",
            textAlign: "center",
            fontFamily: "'Red Hat Display', 'DM Sans', Arial, sans-serif",
          }}
        >
          Privacy and Policy
        </h1>
      </div>
      {/* Terms Content Section */}
      <section
       
      >
        <div
          style={{
            flex: 1,
            minWidth: 1200,
            maxWidth: 600,
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 2px 12px #f9e9c7",
            padding: "32px 18px 28px 18px",
            margin: "40px auto 0 auto", // Add top margin for space after banner, center horizontally
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
         
          <div
            style={{
              color: "#222",
              fontSize: 18,
              lineHeight: 1.8,
              fontWeight: 500,
              fontFamily: "'Red Hat Display', 'DM Sans', Arial, sans-serif",
              padding: "0 8px",
            }}
          >
            <ul
              style={{
                paddingLeft: 0,
                listStyle: "none",
                margin: 0,
              }}
            >
              <li style={{ marginBottom: 22, display: "flex", alignItems: "flex-start" }}>
                <span style={{
                  color: "#bf7e1a",
                  fontWeight: 700,
                  fontSize: 22,
                  marginRight: 12,
                  marginTop: 2,
                  display: "inline-block"
                }}>•</span>
                <span>
                  Users can choose a monthly investment amount between <b>₹100</b> and <b>₹15,00,000</b>.
                </span>
              </li>
              <li style={{ marginBottom: 22, display: "flex", alignItems: "flex-start" }}>
                <span style={{
                  color: "#bf7e1a",
                  fontWeight: 700,
                  fontSize: 22,
                  marginRight: 12,
                  marginTop: 2,
                  display: "inline-block"
                }}>•</span>
                <span>
                  Investments in this scheme start from <b>₹100</b>.
                </span>
              </li>
              <li style={{ marginBottom: 22, display: "flex", alignItems: "flex-start" }}>
                <span style={{
                  color: "#bf7e1a",
                  fontWeight: 700,
                  fontSize: 22,
                  marginRight: 12,
                  marginTop: 2,
                  display: "inline-block"
                }}>•</span>
                <span>
                  The plan will activate once the user’s cumulative investment
                  reaches an amount equivalent to <b>1 gram of gold</b>.
                </span>
              </li>
              <li style={{ marginBottom: 22, display: "flex", alignItems: "flex-start" }}>
                <span style={{
                  color: "#bf7e1a",
                  fontWeight: 700,
                  fontSize: 22,
                  marginRight: 12,
                  marginTop: 2,
                  display: "inline-block"
                }}>•</span>
                <span>
                  Users will earn a return in Greenheap Gold based on their
                  investment tenure.
                  <br />
                  <span style={{ color: "#991313" }}>
                    For example, at 3 months, a return of <b>₹7.50</b> is given,
                    calculated at <b>0.25% per month</b> on an investment of{" "}
                    <b>₹1000</b>.
                  </span>
                </span>
              </li>
              <li style={{ marginBottom: 22, display: "flex", alignItems: "flex-start" }}>
                <span style={{
                  color: "#bf7e1a",
                  fontWeight: 700,
                  fontSize: 22,
                  marginRight: 12,
                  marginTop: 2,
                  display: "inline-block"
                }}>•</span>
                <span>
                  An additional bonus in the form of Silver is provided for each
                  period.
                  <br />
                  <span style={{ color: "#991313" }}>
                    For example, after 3 months, the bonus is <b>₹24</b>,
                    calculated at <b>0.8% per month</b> for an investment of{" "}
                    <b>₹1000</b>.
                  </span>
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start" }}>
                <span style={{
                  color: "#bf7e1a",
                  fontWeight: 700,
                  fontSize: 22,
                  marginRight: 12,
                  marginTop: 2,
                  display: "inline-block"
                }}>•</span>
                <span>
                  If the user cancels the plan after making 5 payments out of a
                  6-month plan, the plan will be adjusted to reflect a 3-month
                  duration. The user will receive the corresponding returns for
                  the 3-month period, minus a <b>6% service charge</b>.
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* Spacer for horizontal layout */}
        <div style={{ flex: 0.2 }} />
      </section>
      {/* Add bottom spacing to ensure all content is visible */}
      <div style={{ height: 60 }} />
    </div>
  );
};

export default PrivacyPlicyPage;
       
