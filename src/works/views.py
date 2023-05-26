from django.shortcuts import render
from django.core.paginator import Paginator

from .models import Work, PortfolioLink, Bio, ContactLink, CV, Icon

query_set = {'research': 1, 'artwork': 2, 'music': 3}
work_per_page = 2

# Create your views here.

def index(request):
    work_list = Work.objects.filter(display_in_press=True)
    portfolio_link = PortfolioLink.objects.all()
    portfolio_link = portfolio_link[len(portfolio_link)-1] if len(portfolio_link)>=1 else None
    bio_text = Bio.objects.all()
    bio_text = bio_text[len(bio_text)-1] if len(bio_text)>=1 else None
    # print(portfolio_link)
    contact_link = ContactLink.objects.all()
    # print(contact_link)
    # print(work_list)
    cv_link = CV.objects.all().order_by('-date')
    cv_link = cv_link[0] if len(cv_link)>=1 else None
    icon_link = Icon.objects.all().order_by('-date')
    icon_link = icon_link[0] if len(icon_link)>=1 else None
    return render(request, 'home.html', {
    	'cur_header': 0,
        'work_list': work_list,
        'portfolio_link': portfolio_link,
        'bio_text': bio_text,
        'contact_link': contact_link,
        'cv': cv_link,
        'icon': icon_link
        })

def works(request):
	# work_list = Work.objects.all()

	filter_key = request.GET.get('filter')

	# print(filter_key)
	# print(work_list)

	filtered_work = Work.objects.all() if (filter_key is None or filter_key =='all') else Work.objects.filter(work_type=query_set.get(filter_key))

	p = Paginator(filtered_work.order_by('-date'), work_per_page)
	page = request.GET.get('page')
	page = 1 if page is None else page
	paged_work = p.get_page(page)

	# print(f'filter: {filter_key}, page: {page}')
	# print(filtered_work)
	cv_link = CV.objects.all().order_by('-date')
	cv_link = cv_link[0] if len(cv_link)>=1 else None
	icon_link = Icon.objects.all().order_by('-date')
	icon_link = icon_link[0] if len(icon_link)>=1 else None

	return render(request, 'works.html', {
		'cur_header': 1,
		'work_list': filtered_work,
		'paged_work': paged_work,
		'num_page': [i+1 for i in range(p.num_pages)],
		'filter_key': str(filter_key),
		'cur_page': int(page),
		'cv': cv_link,
		'icon': icon_link
		})


def show_work(request, work_id):
	work = Work.objects.get(pk=work_id)
	cv_link = CV.objects.all().order_by('-date')
	cv_link = cv_link[0] if len(cv_link)>=1 else None
	icon_link = Icon.objects.all().order_by('-date')
	icon_link = icon_link[0] if len(icon_link)>=1 else None

	return render(request, 'work_show.html', {
		'cur_header': 1,
		'work': work,
		'cv': cv_link,
		'icon': icon_link
		})


