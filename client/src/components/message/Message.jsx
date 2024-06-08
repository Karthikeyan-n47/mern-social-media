import "./message.css";

export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://images.pexels.com/photos/354951/pexels-photo-354951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="messageImg"
        />
        <p className="messageText">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda ut
          delectus doloremque et. Obcaecati asperiores, eveniet, accusantium est
          ad placeat laudantium quia voluptatibus maxime, esse exercitationem.
          Consectetur quibusdam fuga perspiciatis incidunt aliquid dolore
          praesentium maxime velit ipsum cumque. Placeat quo enim deleniti nihil
          magni dolores, fuga tempore quod rerum nesciunt.
        </p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
