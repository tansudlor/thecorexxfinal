const NFTCard = ({ nft, index, imageId }) => {
  const { tokenId, tokenUri, metadata, isListed } = nft;

  const IMAGE_PATH =
    "https://vercel-static-files.s3.ap-southeast-1.amazonaws.com/images/nft/";
  const { name = null } = metadata ?? {};

  return (
    <div className="card w-60 bg-base-100 shadow-xl">
      <figure>
        <img className="" src={IMAGE_PATH + imageId + ".png"} />
      </figure>
      {/* <p>{tokenId}</p> */}
    </div>
  );
};

export default NFTCard;
