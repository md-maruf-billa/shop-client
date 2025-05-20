import noData from "@/assets/images/nodata.jpg"

const NoData = () => {
      return (
            <div className="flex justify-center items-center">
                  <img className="md:w-1/3" src={noData} alt="" />
            </div>
      );
};

export default NoData;