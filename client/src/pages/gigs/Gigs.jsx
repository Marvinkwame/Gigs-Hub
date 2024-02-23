import React, { useRef } from "react";
import "./Gigs.scss";
import { BiDownArrowAlt } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { TiArrowUp } from "react-icons/ti";
import Gigcard from "../../components/gigCard/Gigcard";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [open, setOpen] = React.useState("sales");
  const [sort, setSort] = React.useState(false);
  const maxRef = useRef();
  const minRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      newRequest
        .get(
          `gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  const newSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  React.useEffect(() => {
    refetch()
  }, [sort])

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <h2 className="gigs-title">
          <AiOutlineHome /> / {search}
        </h2>
        <h3 className="gig-title">Gigsters: Graphics and Design</h3>
        <p className="gig-note">
          Explore the boundaries of art and technology with Gigsters' AI artists
        </p>
        <div className="menu">
          <div className="left-side">
            <h4>Budget</h4>
            <input ref={maxRef} type="number" placeholder="max" />
            <input ref={minRef} type="number" placeholder="min" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right-side">
            <h4>Sort By:</h4>

            <p className="sort-name">
              {sort === "sales" ? "Best Sellling" : "Newest"}
            </p>
            {open ? (
              <TiArrowUp onClick={() => setOpen(false)} />
            ) : (
              <BiDownArrowAlt onClick={() => setOpen(true)} />
            )}

            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => newSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => newSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => newSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        <div className="gig-cards">
          {isLoading
            ? "Loading"
            : error
            ? "Something went wrong"
            : data.map((gig) => <Gigcard key={gig._id} gig={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
