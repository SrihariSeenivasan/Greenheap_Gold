import Carousel from "@/components/custom/Carousel";
import CustomButton from "@/components/custom/CustomButton";
import CustomImage from "@/components/custom/Image";
import style from "./style.module.css";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;
  // const product = await fetchPosts();
  return {
    title: "Home | Greenheap Gold And Silver Jewellery Private Limited",
    description: "Greenheap Gold And Silver Jewellery Private Limited",
    keywords: "Greenheap Gold And Silver Jewellery Private Limited",
  };
}

export default function Home() {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <Carousel />
        <div className="d-flex   justify-content-center ">
          <div className="goldsiver-box bg-white p-4 mt-5">
            <ul
              className="nav nav-pills mb-3 border-2 border-bottom"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item m-auto pb-2" role="presentation">
                <span
                  className="active cursor-pointer fw-bolder fs-5 gold_text"
                  id=""
                  data-bs-toggle="pill"
                  data-bs-target=""
                  role=""
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Digital gold / Silver
                </span>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div className="row  border-2 border-bottom">
                <div className="col-lg-6 mb-2 border-2 border-end">
                  <div className=" d-flex align-items-center gap-2">
                    <div className="m-0">
                      Live Buy Price (Gold) <span>22k</span>
                    </div>
                  </div>
                  <div className=" d-flex  align-items-center justify-content-between my-3">
                    <div className="m-0 fw-bolder">7980/gm</div>
                    <div className="m-0">+3% GST applicable</div>
                  </div>
                </div>
                <div className="col-lg-6 mb-2">
                  <div className=" d-flex align-items-center gap-2">
                    <div className="m-0 livebuy">
                      Live Buy Price (Gold) <span>24k</span>
                    </div>
                  </div>
                  <div className=" d-flex  align-items-center justify-content-between my-3">
                    <div className="m-0 fw-bolder">8705/gm</div>
                    <div className="m-0">+3% GST applicable</div>
                  </div>
                </div>
              </div>
              <div className=" d-flex align-items-center gap-2 pt-2">
                <div className="m-0 livebuy">
                  Live Buy Price (Silver) <span>99.9%</span>
                </div>
              </div>
              <div className=" d-flex  align-items-center justify-content-between my-3">
                <div className="m-0 fw-bolder">107/gm</div>
                <div className="m-0">+3% GST applicable</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={`mb-5 mt-6 pt-6 ${style.home_scheme_section}`}>
        <h3 className="text-center text-black">Quick overview of schemes</h3>
      </section>

      <div className={`${style.img_wrapper}`}>
        <CustomImage
          src={`/red_banner.png`}
          wrapperClss={`${style.img_responsive}`}
        />
        <div className={`${style.img_overlay}`}>
          <CustomButton
            className={`btn btn-md btn-success w-auto ${style.explore_btn}`}
            title={`Explore`}
          ></CustomButton>
        </div>
      </div>
    </div>
  );
}
