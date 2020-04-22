import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from "react-star-ratings";

class Job extends React.Component {

    render() {
        return (
          <>
            <td>
                Painting
            </td>
            <td>
                vancouver
            </td>
            <td>
                April 01,2020
            </td>
            <td>
                April 05,2020
            </td>
            <td>
            <StarRatings
              rating= {4}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
            />
            </td>
            <td>
                <FontAwesomeIcon icon="check-circle" color="blue" />
            </td>
          </>
        );
    }
}

export default Job;

