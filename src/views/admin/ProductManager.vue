<template>
    <div>
        <h3 class="mb-3"><i class="bi bi-cart-fill"></i> Quản lý Vật phẩm</h3>
        <a href="#" class="btn btn-primary mb-3">+ Thêm mới Vật phẩm</a>

        <table class="table table-bordered table-hover text-center align-middle">
            <thead class="table-dark">
                <tr>
                    <th>#</th>
                    <th>Ảnh</th>
                    <th>Tên Vật phẩm</th>
                    <th>Game</th>
                    <th>Giá</th>
                    <th>Tồn kho</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><img src="..." class="rounded" alt="Item"></td>
                    <td>Crystal Top-Up</td>
                    <td>Genshin Impact</td>
                    <td>500.000đ</td>
                    <td>120</td>
                    <td><span class="badge bg-success">Còn hàng</span></td>
                    <td>
                        <button class="btn btn-warning btn-sm">Sửa</button>
                        <button class="btn btn-danger btn-sm">Xóa</button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><img src="..." class="rounded" alt="Item"></td>
                    <td>Monthly Pass</td>
                    <td>Honkai Star Rail</td>
                    <td>120.000đ</td>
                    <td>0</td>
                    <td><span class="badge bg-danger">Hết hàng</span></td>
                    <td>
                        <button class="btn btn-warning btn-sm">Sửa</button>
                        <button class="btn btn-danger btn-sm">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped></style>