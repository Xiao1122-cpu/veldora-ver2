<template>
    <div>
        <div class="row mb-4">
            <div class="col-md-4">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">Tin tức</h5>
                        <p class="card-text fs-4">120</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">Game</h5>
                        <p class="card-text fs-4">5</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">Carousel</h5>
                        <p class="card-text fs-4">320</p>
                    </div>
                </div>
            </div>
        </div>

        <h5 class="mb-3">Tin tức mới nhất</h5>
        <div class="list-group mb-5">
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">Tiêu đề bài viết 1</h6>
                    <small>05/10/2025</small>
                </div>
                <p class="mb-1">Mô tả ngắn cho bài viết 1...</p>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">Tiêu đề bài viết 2</h6>
                    <small>04/10/2025</small>
                </div>
                <p class="mb-1">Mô tả ngắn cho bài viết 2...</p>
            </a>
            <!-- thêm bài viết -->
        </div>

        <h5 class="mb-3">Người Dùng Đăng Ký Gần Đây</h5>
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Người mua</th>
                        <th>Vật phẩm</th>
                        <th>Game</th>
                        <th>Giá</th>
                        <th>Ngày</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>A</td>
                        <td>Item 1</td>
                        <td>Game X</td>
                        <td>100.000đ</td>
                        <td>05/10/2025</td>
                        <td><span class="badge bg-success">Hoàn tất</span></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>B</td>
                        <td>Item 2</td>
                        <td>Game Y</td>
                        <td>200.000đ</td>
                        <td>04/10/2025</td>
                        <td><span class="badge bg-warning text-dark">Chờ</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>