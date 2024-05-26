import ReactLoading from "react-loading";

const Loading = () => {
    return(
        <div className="popup">
            <ReactLoading
              type={"bars"}
              color={"#ffffff"}
              height={600}
              width={100}
              className="center"
            />
        </div>
    )
    }

export default Loading;
