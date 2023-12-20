import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import localStorage from "libs/localStorage";

import i18next from "i18n";
import coursesAPIs from "apis/courses.apis";
import { toast } from "react-toastify";

const columns = [
  { Header: "Title", accessor: "title", width: "45%", align: "left" },
  { Header: "Status", accessor: "status", align: "center" },
  { Header: "Created At", accessor: "createdAt", align: "center" },
  // { Header: "view", accessor: "view", align: "center" },
  // { Header: "Edit", accessor: "edit", align: "center" },
  // { Header: "Comments", accessor: "comments", align: "center" },
];

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const useCoursesData = (onAction) => {
  const [rows, setrows] = useState([]);
  const [coursesData, setcoursesData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setisLoading(true);

      const userData = localStorage.getUser();
      const courses = await coursesAPIs.getCourseByUserId(userData.user_id);
      setrows(
        courses.map((v) => ({
          title: (
            <MDTypography
              component="a"
              href="#"
              variant="subtitle2"
              color="text"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {v.title}
            </MDTypography>
          ),
          student_count: (
            <MDTypography
              component="a"
              href="#"
              variant="subtitle2"
              color="text"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {v.student_count}
            </MDTypography>
          ),
          // comments: (
          //   <MDTypography
          //     variant="body2"
          //     color="text"
          //     fontWeight="medium"
          //     onClick={() => {
          //       navigate("/course_comments/" + v.id);
          //     }}
          //   >
          //     {i18next.t("courses.view_comments")}
          //   </MDTypography>
          // ),
          status: (
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={v.is_published ? "Published" : "Unpublished"}
                color={v.is_published ? "success" : "secondary"}
                variant="gradient"
                size="lg"
              />
            </MDBox>
          ),
          createdAt: (
            <MDTypography variant="body2" color="text" fontWeight="medium">
              {formatDate(v.createdAt)}
            </MDTypography>
          ),
        }))
      );
      setcoursesData(courses);
    } catch (error) {
      toast.error("something went wrong!");
    } finally {
      setisLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    columns,
    rows,
    fetchData,
    coursesData,
    isLoading,
  };
};

export default useCoursesData;
