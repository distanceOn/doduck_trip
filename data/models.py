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


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    city = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(100))
    role = Column(String(20))  # 'user' or 'entrepreneur'

    # Отношения
    reviews = relationship('Review', backref='user')
    bookings = relationship('Booking', backref='user')
    vehicles = relationship('Vehicle', backref='user')
    interests = relationship('Interest', backref='user')


class Spot(Base):
    __tablename__ = 'spots'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    description = Column(String(255))
    location = Column(String(255))  # Можно использовать Geography для PostGIS
    type = Column(String(50))  # 'hub', 'pitstop', 'resort'
    entrepreneur_id = Column(Integer, ForeignKey('users.id'))
    photos = Column(String(255))
    amenities = Column(String(255))
    reviews = relationship('Review', backref='spot')
    rating = Column(Float)

    # Отношения
    services = relationship('Service', backref='spot')


class Route(Base):
    __tablename__ = 'routes'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    description = Column(String(255))
    starting_point = Column(String(255))
    ending_point = Column(String(255))
    distance = Column(Float)
    estimated_time = Column(Float)
    difficulty_level = Column(String(50))

    # Связь многие-ко-многим с Spot через вспомогательную таблицу
    waypoints = relationship('Spot', secondary=route_spot_association)


class Service(Base):
    __tablename__ = 'services'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    description = Column(String(255))
    price = Column(Float)
    spot_id = Column(Integer, ForeignKey('spots.id'))
    is_standard = Column(Boolean)


class Review(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    spot_id = Column(Integer, ForeignKey('spots.id'))
    rating = Column(Float)
    comment = Column(String(255))
    date = Column(DateTime, server_default=func.now())


class Booking(Base):
    __tablename__ = 'bookings'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    spot_id = Column(Integer, ForeignKey('spots.id'))
    service_id = Column(Integer, ForeignKey('services.id'))
    date = Column(DateTime)
    time = Column(DateTime)
    price = Column(Float)


class Vehicle(Base):
    __tablename__ = 'vehicles'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    type = Column(String(50))
    model = Column(String(50))
    additional_features = Column(String(255))


class Interest(Base):
    __tablename__ = 'interests'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String(100))


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
