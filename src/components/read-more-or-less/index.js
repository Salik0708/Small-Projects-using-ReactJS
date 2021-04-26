import React, { useState } from "react";

const ReadMoreOrLess = () => {
  const [isReadMore, setReadMore] = useState(false);

  return (
    <React.Fragment>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scel
        {!isReadMore && <span>...</span>}
        {isReadMore && (
          <span>
            erisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
            congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
            aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim
            ac. In at libero sed nunc venenatis imperdiet sed ornare turpis.
            Donec vitae dui eget tellus gravida venenatis. Integer fringilla
            congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta.
          </span>
        )}
      </p>
      <button onClick={() => setReadMore((oldIsReadMore) => !oldIsReadMore)}>
        {isReadMore ? "Read less" : "Read more"}
      </button>
    </React.Fragment>
  );
};

export default ReadMoreOrLess;
