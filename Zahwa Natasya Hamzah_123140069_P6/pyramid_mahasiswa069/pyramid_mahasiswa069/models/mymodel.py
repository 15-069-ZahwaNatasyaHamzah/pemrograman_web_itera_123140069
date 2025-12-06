from sqlalchemy import (
    Column,
    Integer,
    String,
)

from .meta import Base


class Matakuliah(Base):
    """
    Model untuk data Matakuliah (Course)
    Attributes:
        id: Primary key - Auto increment
        kode_mk: Kode mata kuliah (Course code) - Unique, Not null
        nama_mk: Nama mata kuliah (Course name) - Not null
        sks: Jumlah SKS (Credit hours) - Not null
        semester: Semester pengambilan (Semester taken) - Not null
    """
    __tablename__ = 'matakuliah'

    id = Column(Integer, primary_key=True)
    kode_mk = Column(String(50), unique=True, nullable=False, index=True)
    nama_mk = Column(String(255), nullable=False)
    sks = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)

    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'kode_mk': self.kode_mk,
            'nama_mk': self.nama_mk,
            'sks': self.sks,
            'semester': self.semester,
        }

    def __repr__(self):
        return f'<Matakuliah(id={self.id}, kode_mk={self.kode_mk}, nama_mk={self.nama_mk}, sks={self.sks}, semester={self.semester})>'
