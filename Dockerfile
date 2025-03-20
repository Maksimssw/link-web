# Stage 1: Build stage
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock (или package-lock.json)
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем остальные файлы проекта
COPY . .

# Собираем проект для production
RUN yarn build

# Stage 2: Production stage
FROM node:20-alpine AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только собранные файлы из build stage
COPY --from=build /app/dist ./dist

# Устанавливаем serve для запуска статического сервера
RUN yarn global add serve

# Запускаем приложение на порту 3000
CMD ["serve", "-s", "dist", "-l", "3000"]