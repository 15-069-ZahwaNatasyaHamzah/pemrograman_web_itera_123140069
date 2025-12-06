"""
Test suite untuk API endpoints Matakuliah
"""
import unittest
import json
from pyramid import testing
from pyramid.request import Request

from ..models import Matakuliah
from ..views.default import (
    get_all_matakuliah,
    get_matakuliah_detail,
    create_matakuliah,
    update_matakuliah,
    delete_matakuliah,
)


class TestMatakuliahAPI(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()
        
    def tearDown(self):
        testing.tearDown()

    def _makeRequest(self, method='GET', route_name='', **kwargs):
        """Helper method untuk membuat request"""
        request = testing.DummyRequest()
        request.method = method
        request.matched_route.name = route_name
        request.response.status = 200
        request.json_body = kwargs
        return request

    def test_matakuliah_model(self):
        """Test Matakuliah model creation"""
        mk = Matakuliah(
            kode_mk='IF101',
            nama_mk='Algoritma dan Pemrograman',
            sks=3,
            semester=1
        )
        self.assertEqual(mk.kode_mk, 'IF101')
        self.assertEqual(mk.nama_mk, 'Algoritma dan Pemrograman')
        self.assertEqual(mk.sks, 3)
        self.assertEqual(mk.semester, 1)

    def test_matakuliah_to_dict(self):
        """Test Matakuliah to_dict method"""
        mk = Matakuliah(
            id=1,
            kode_mk='IF101',
            nama_mk='Algoritma dan Pemrograman',
            sks=3,
            semester=1
        )
        result = mk.to_dict()
        self.assertIsInstance(result, dict)
        self.assertEqual(result['id'], 1)
        self.assertEqual(result['kode_mk'], 'IF101')
        self.assertEqual(result['nama_mk'], 'Algoritma dan Pemrograman')
        self.assertEqual(result['sks'], 3)
        self.assertEqual(result['semester'], 1)


if __name__ == '__main__':
    unittest.main()
