import { Link } from "react-router-dom";
import {
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
  photo7,
  photo8,
} from "../../assets/img/index";

const AboutPage = () => {
  return (
    <div className="absolute top-0 left-0 about-background w-full h-full ">
      <div className="flex xs:mt-[288px] mt-[210px] items-center justify-center">
        <div className="flex flex-col  sm:w-[555px] xs:w-[390px] w-[280px]">
          <h className="font-shoebox-right font-normal md:text-5xl sm:text-4xl xs:text-3xl text-2xl mb-5 text-white">
            Время путешествовать
          </h>
          <p className="text-xl/8  font-sans text-white  opacity-60">
            Отправляйтесь в захватывающее приключение по огромным просторам
            нашей страны. Выберите путешествие на автомобиле или доме на колёсах
          </p>
          <Link to="/login">
            <button className=" mt-5 bg-MyOrange1 text-black py-3 px-4 rounded-lg  xs:w-48 xs:h-14 text-center w-44 h-12 hover:opacity-80 transition-all">
              <p className="text-white font-sans font-bold text-base ">Войти</p>
            </button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center mt-[350px] sm:mt-[450px] mb-[200px]">
        <div className="flex flex-col sm:flex-row sm:w-[555px] xs:w-[390px] w-[280px]">
          <div className=" w-74 flex flex-wrap justify-between">
            <div className="flex justify-around w-full mt-[-6rem]">
              <img
                src={photo1}
                alt="photo"
                className="w-16 h-16 rounded mt-14 mr-16  -ml-7"
              />
              <img
                src={photo2}
                alt="photo"
                className="w-16 h-16 rounded mr-10 -ml-14"
              />
              <img
                src={photo4}
                alt="photo"
                className="w-14 h-14 rounded mt-5 "
              />
            </div>
            <div className="items-center justify-center flex w-full -mt-12">
              <img src={photo3} alt="photo" className="w-32 h-32 rounded" />
            </div>
            <div className="flex justify-around w-full mb-10 mt-5">
              <img src={photo5} alt="photo" className="w-16 h-16 rounded" />
              <img src={photo6} alt="photo" className="w-16 h-16 rounded" />
            </div>
          </div>
          <div className="flex flex-col mt-5 sm:mt-[-6rem] sm:w-60 w-74 h-64 sm:ml-5 ml-0">
            <h className=" text-3xl font-sans text-[#161C2D] font-bold">
              Выберите рекомендуемый маршрут или создайте свой.
            </h>
            <p className="font-sans text-[#161C2D]  opacity-70  mt-3">
              Безопасные путешествия с удобной стоянкой у каждой
              достопримечательности.
            </p>
            <p className="font-sans text-[#161C2D] opacity-70 mt-3">
              Единая система навигации ко всем пит-стопам, хабам и резортам
              края.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-col sm:flex-row mt-5 sm:mt-0 sm:w-[555px] xs:w-[390px] w-[280px] ">
          <div className="flex flex-col  sm:w-60 w-74 mb-10 sm:mr-12 mr-0">
            <h className=" text-3xl font-sans text-[#161C2D] font-bold">
              Удобная бронь и оплата прямо в пути!
            </h>
            <p className="font-sans text-[#161C2D]  opacity-70  mt-3">
              Подберëм ближайшую стоянку для вас и вашего транспорта. Сотни
              экскурсий, мест для отдыха кафе и ресторанов в единой системе
            </p>
          </div>
          <div className=" w-74 flex flex-wrap justify-between">
            <img
              src={photo7}
              alt="photo"
              className="w-32 h-32 rounded flex  justify-end"
            />
            <img
              src={photo8}
              alt="photo"
              className="w-32 h-32 rounded  mt-14 ml-36 "
            />
          </div>
        </div>
      </div>
      <div className="flex h-20 md:h-0"></div>
    </div>
  );
};

export default AboutPage;
