import asyncio
# -*- coding: utf-8 -*-
from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean, DateTime, Table
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base

from sqlalchemy.orm import relationship
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import func

from data.config import ALCHEMY_DATABASE_URL

Base = declarative_base()

# Вспомогательная таблица для связи многие-ко-многим между Route и Spot
route_spot_association = Table('route_spot_association', Base.metadata,
                               Column('route_id', ForeignKey('routes.id'), primary_key=True),
                               Column('spot_id', ForeignKey('spots.id'), primary_key=True)
                               )

spot_interest_association = Table(
    'spot_interest_association', Base.metadata,
    Column('spot_id', ForeignKey('spots.id'), primary_key=True),
    Column('interest_id', ForeignKey('interests.id'), primary_key=True)
)


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    first_name = Column(String(50), nullable=True)
    last_name = Column(String(50), nullable=True)
    city = Column(String(100), nullable=True)
    bio = Column(String(255), nullable=True)
    photo_url = Column(String(255), nullable=True)
    email = Column(String(100), unique=True)
    password = Column(String(100))
    role = Column(String(20), default='user')  # 'user' or 'entrepreneur'

    # Отношения
    # reviews = relationship('Review', backref='user')
    # bookings = relationship('Booking', backref='user')
    # vehicles = relationship('Vehicle', backref='user')

    # interests = relationship('Interest', backref='user')

    def to_dict(self):
        """
        Сериализует данные пользователя в словарь, исключая пароль.
        """
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "city": self.city,
            "email": self.email,
            "role": self.role,
            "photo_url": self.photo_url,
            "bio": self.bio
        }


class Spot(Base):
    __tablename__ = 'spots'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    contact_phone = Column(String(20), nullable=True)
    type = Column(String(50), nullable=False)
    rating = Column(Float, default=0.0)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    # Отношения
    photos = relationship("SpotPhoto", back_populates="spot", cascade="all, delete")
    routes = relationship('Route', secondary=route_spot_association, back_populates="waypoints", cascade="all, delete")
    interests = relationship("Interest", secondary="spot_interest_association", back_populates="spots",
                             cascade="all, delete")
    services = relationship("SpotService", back_populates="spot", cascade="all, delete")


class StandardService(Base):
    __tablename__ = 'standard_services'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    description = Column(String(255))
    spot_type = Column(String(50))


class SpotService(Base):
    __tablename__ = 'spot_services'
    id = Column(Integer, primary_key=True)
    spot_id = Column(Integer, ForeignKey('spots.id'), nullable=False)
    service_id = Column(Integer, ForeignKey('standard_services.id'))
    custom_name = Column(String(100), nullable=True)
    description = Column(String(255), nullable=True)
    price = Column(Float)
    is_custom = Column(Boolean, default=False)

    spot = relationship("Spot", back_populates="services")
    standard_service = relationship("StandardService")


class SpotPhoto(Base):
    __tablename__ = 'spot_photos'
    id = Column(Integer, primary_key=True)
    spot_id = Column(Integer, ForeignKey('spots.id'), nullable=False)
    photo_url = Column(String(255), nullable=False)

    spot = relationship('Spot', back_populates='photos')  # Указываем, что это поле связано с Spot.photos


class Route(Base):
    __tablename__ = 'routes'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    starting_point = Column(String(255), nullable=True)
    ending_point = Column(String(255), nullable=True)
    distance = Column(Float, nullable=True)
    estimated_time = Column(Float, nullable=True)
    difficulty_level = Column(String(50), nullable=True)

    # Связь многие-ко-многим с Spot через вспомогательную таблицу
    waypoints = relationship('Spot', secondary=route_spot_association, back_populates="routes")


class Interest(Base):
    __tablename__ = 'interests'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    photo_url = Column(String(255), nullable=True)  # URL фотографии удобства

    spots = relationship("Spot", secondary="spot_interest_association", back_populates="interests")


#
#
# class Review(Base):
#     __tablename__ = 'reviews'
#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey('users.id'))
#     spot_id = Column(Integer, ForeignKey('spots.id'))
#     rating = Column(Float)
#     comment = Column(String(255))
#     date = Column(DateTime, server_default=func.now())
#
#
# class Booking(Base):
#     __tablename__ = 'bookings'
#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey('users.id'))
#     spot_id = Column(Integer, ForeignKey('spots.id'))
#     service_id = Column(Integer, ForeignKey('services.id'))
#     date = Column(DateTime)
#     time = Column(DateTime)
#     price = Column(Float)
#
#
# class Vehicle(Base):
#     __tablename__ = 'vehicles'
#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey('users.id'))
#     type = Column(String(50))
#     model = Column(String(50))
#     additional_features = Column(String(255))


class Amenity(Base):
    __tablename__ = 'amenities'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)


engine = create_async_engine(
    ALCHEMY_DATABASE_URL,
    echo=True,  # DEBUG  # включает логирование SQL-запросов (для отладки).
    pool_size=10,  # Минимальное количество соединений в пуле
    max_overflow=50  # Максимальное количество соединений в пуле
)
# Создание асинхронной сессии
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all, checkfirst=True)  # DEBUG MODE
        await conn.run_sync(Base.metadata.create_all, checkfirst=True)


if __name__ == '__main__':
    asyncio.run(create_tables())
