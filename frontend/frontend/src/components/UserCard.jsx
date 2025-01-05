const UserCard = () => {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="https://pbs.twimg.com/profile_images/1872986420429897731/o0rtqOVD_400x400.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Jatin</h2>
          <p>blah blah blah blah</p>
          <div className="card-actions justify-end">
            <button className="btn  bg-pink-500 ">ssup</button>
            <button className="btn btn-primary ">ssup</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
