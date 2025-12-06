def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    
    # API Routes untuk Matakuliah
    config.add_route('matakuliah_list', '/api/matakuliah')
    config.add_route('matakuliah_detail', '/api/matakuliah/{id}')
