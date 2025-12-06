from pyramid.response import Response
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
    HTTPConflict,
    HTTPInternalServerError,
)
import json

from sqlalchemy.exc import DBAPIError, IntegrityError
from sqlalchemy import exc

from .. import models


# GET - Mendapatkan semua matakuliah
@view_config(route_name='matakuliah_list', renderer='json', request_method='GET')
def get_all_matakuliah(request):
    """
    GET /api/matakuliah
    Mendapatkan semua data matakuliah
    """
    try:
        query = request.dbsession.query(models.Matakuliah)
        matakuliahs = query.all()
        data = [m.to_dict() for m in matakuliahs]
        return {
            'success': True,
            'message': f'Berhasil mengambil {len(data)} data matakuliah',
            'matakuliahs': data
        }
    except DBAPIError:
        return {
            'success': False,
            'message': 'Database connection error',
            'error': 'Unable to connect to database'
        }


# GET - Mendapatkan detail satu matakuliah
@view_config(route_name='matakuliah_detail', renderer='json', request_method='GET')
def get_matakuliah_detail(request):
    """
    GET /api/matakuliah/{id}
    Mendapatkan detail satu matakuliah berdasarkan ID
    """
    mk_id = request.matchdict.get('id')
    
    try:
        matakuliah = request.dbsession.query(models.Matakuliah).filter(
            models.Matakuliah.id == mk_id
        ).first()
        
        if not matakuliah:
            request.response.status = 404
            return {
                'success': False,
                'message': f'Matakuliah dengan ID {mk_id} tidak ditemukan',
                'error': 'Not Found'
            }
        
        return {
            'success': True,
            'message': 'Berhasil mengambil detail matakuliah',
            'matakuliah': matakuliah.to_dict()
        }
    except (ValueError, TypeError):
        request.response.status = 400
        return {
            'success': False,
            'message': 'ID harus berupa angka',
            'error': 'Invalid ID format'
        }
    except DBAPIError:
        request.response.status = 500
        return {
            'success': False,
            'message': 'Database connection error',
            'error': 'Unable to connect to database'
        }


# POST - Menambahkan matakuliah baru
@view_config(route_name='matakuliah_list', renderer='json', request_method='POST')
def create_matakuliah(request):
    """
    POST /api/matakuliah
    Menambahkan matakuliah baru
    Request body:
    {
        "kode_mk": "IF101",
        "nama_mk": "Algoritma dan Pemrograman",
        "sks": 3,
        "semester": 1
    }
    """
    try:
        body = request.json_body
    except:
        request.response.status = 400
        return {
            'success': False,
            'message': 'Request body harus JSON',
            'error': 'Invalid JSON'
        }
    
    # Validasi input
    required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
    for field in required_fields:
        if field not in body or body[field] is None:
            request.response.status = 400
            return {
                'success': False,
                'message': f'Field {field} wajib diisi',
                'error': f'Missing required field: {field}'
            }
    
    # Validasi tipe data
    try:
        sks = int(body.get('sks'))
        semester = int(body.get('semester'))
        if sks <= 0 or semester <= 0:
            raise ValueError('SKS dan Semester harus lebih besar dari 0')
    except (ValueError, TypeError) as e:
        request.response.status = 400
        return {
            'success': False,
            'message': 'SKS dan Semester harus berupa angka positif',
            'error': str(e)
        }
    
    try:
        new_mk = models.Matakuliah(
            kode_mk=body.get('kode_mk').strip(),
            nama_mk=body.get('nama_mk').strip(),
            sks=sks,
            semester=semester
        )
        request.dbsession.add(new_mk)
        request.dbsession.flush()
        
        request.response.status = 201
        return {
            'success': True,
            'message': 'Matakuliah berhasil ditambahkan',
            'matakuliah': new_mk.to_dict()
        }
    except IntegrityError as e:
        request.dbsession.rollback()
        request.response.status = 409
        return {
            'success': False,
            'message': 'Kode mata kuliah sudah terdaftar',
            'error': 'Duplicate kode_mk'
        }
    except DBAPIError as e:
        request.dbsession.rollback()
        request.response.status = 500
        return {
            'success': False,
            'message': 'Database connection error',
            'error': 'Unable to connect to database'
        }
    except Exception as e:
        request.dbsession.rollback()
        request.response.status = 500
        return {
            'success': False,
            'message': 'Error saat membuat matakuliah',
            'error': str(e)
        }


# PUT - Update matakuliah
@view_config(route_name='matakuliah_detail', renderer='json', request_method='PUT')
def update_matakuliah(request):
    """
    PUT /api/matakuliah/{id}
    Update data matakuliah
    Request body:
    {
        "kode_mk": "IF101",
        "nama_mk": "Algoritma dan Pemrograman",
        "sks": 3,
        "semester": 1
    }
    """
    mk_id = request.matchdict.get('id')
    
    try:
        body = request.json_body
    except:
        request.response.status = 400
        return {
            'success': False,
            'message': 'Request body harus JSON',
            'error': 'Invalid JSON'
        }
    
    try:
        matakuliah = request.dbsession.query(models.Matakuliah).filter(
            models.Matakuliah.id == mk_id
        ).first()
        
        if not matakuliah:
            request.response.status = 404
            return {
                'success': False,
                'message': f'Matakuliah dengan ID {mk_id} tidak ditemukan',
                'error': 'Not Found'
            }
        
        # Update fields jika ada
        if 'kode_mk' in body and body['kode_mk']:
            matakuliah.kode_mk = body['kode_mk'].strip()
        if 'nama_mk' in body and body['nama_mk']:
            matakuliah.nama_mk = body['nama_mk'].strip()
        if 'sks' in body and body['sks']:
            sks = int(body['sks'])
            if sks <= 0:
                raise ValueError('SKS harus lebih besar dari 0')
            matakuliah.sks = sks
        if 'semester' in body and body['semester']:
            semester = int(body['semester'])
            if semester <= 0:
                raise ValueError('Semester harus lebih besar dari 0')
            matakuliah.semester = semester
        
        request.dbsession.flush()
        
        return {
            'success': True,
            'message': 'Matakuliah berhasil diupdate',
            'matakuliah': matakuliah.to_dict()
        }
    except IntegrityError:
        request.dbsession.rollback()
        request.response.status = 409
        return {
            'success': False,
            'message': 'Kode mata kuliah sudah terdaftar',
            'error': 'Duplicate kode_mk'
        }
    except (ValueError, TypeError) as e:
        request.dbsession.rollback()
        request.response.status = 400
        return {
            'success': False,
            'message': 'Format data tidak valid',
            'error': str(e)
        }
    except DBAPIError:
        request.dbsession.rollback()
        request.response.status = 500
        return {
            'success': False,
            'message': 'Database connection error',
            'error': 'Unable to connect to database'
        }
    except Exception as e:
        request.dbsession.rollback()
        request.response.status = 500
        return {
            'success': False,
            'message': 'Error saat mengupdate matakuliah',
            'error': str(e)
        }


# DELETE - Menghapus matakuliah
@view_config(route_name='matakuliah_detail', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    """
    DELETE /api/matakuliah/{id}
    Menghapus data matakuliah
    """
    mk_id = request.matchdict.get('id')
    
    try:
        matakuliah = request.dbsession.query(models.Matakuliah).filter(
            models.Matakuliah.id == mk_id
        ).first()
        
        if not matakuliah:
            request.response.status = 404
            return {
                'success': False,
                'message': f'Matakuliah dengan ID {mk_id} tidak ditemukan',
                'error': 'Not Found'
            }
        
        request.dbsession.delete(matakuliah)
        request.dbsession.flush()
        
        return {
            'success': True,
            'message': 'Matakuliah berhasil dihapus'
        }
    except (ValueError, TypeError):
        request.response.status = 400
        return {
            'success': False,
            'message': 'ID harus berupa angka',
            'error': 'Invalid ID format'
        }
    except DBAPIError:
        request.dbsession.rollback()
        request.response.status = 500
        return {
            'success': False,
            'message': 'Database connection error',
            'error': 'Unable to connect to database'
        }
    except Exception as e:
        request.dbsession.rollback()
        request.response.status = 500
        return {
            'success': False,
            'message': 'Error saat menghapus matakuliah',
            'error': str(e)
        }

