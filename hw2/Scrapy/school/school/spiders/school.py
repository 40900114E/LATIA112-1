import scrapy

class SchoolSpider(scrapy.Spider):
    name = "school"
    allowed_domains = ["school.chc.edu.tw"]
    start_urls = ["https://school.chc.edu.tw/user/basic/view?all=true"]

    def parse(self, response):
        tables = response.xpath('//table[@id="schoolTable"]//tr[position()>0]')  # Skip the header row

        for table in tables:
            number = table.xpath('.//td[@data-label="No."]/text()').extract_first()
            name = table.xpath('.//td[@data-label="學校名稱"]/a/text()').extract_first()
            address = table.xpath('.//td[@data-label="地址"]/text()').extract_first()
            phone = table.xpath('.//td[@data-label="電話"]/text()').extract_first()
            net = table.xpath('.//td[@data-label="網路電話"]/text()').extract_first()
            fax = table.xpath('.//td[@data-label="傳真"]/text()').extract_first()
            homepage = table.xpath('.//td[@data-label="學校首頁"]/a/@href').extract_first()
            update_time = table.xpath('.//td[@data-label="更新時間"]/text()').extract_first()

            yield {
                '#': number,
                '學校名稱': name,
                '地址': address,
                '電話': phone,
                '網路電話': net,
                '傳真': fax,
                '學校首頁': homepage,
                '更新時間': update_time
            }